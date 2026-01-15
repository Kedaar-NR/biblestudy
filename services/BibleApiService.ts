export interface Translation {
    id: string;
    name: string;
    website: string;
    licenseUrl: string;
    shortName: string;
    englishName: string;
    language: string;
    textDirection: string;
    sha256: string;
    availableFormats: string[];
    listOfBooksApiLink: string;
}

export interface Book {
    id: string;
    name: string;
    commonName: string;
    title: string;
    order: number;
    numberOfChapters: number;
    firstChapterApiLink: string;
    lastChapterApiLink: string;
    totalNumberOfVerses: number;
}

export interface Chapter {
    chapter: {
        number: number;
        content?: string[];
        verses?: Array<string | { verse: number; text: string }>;
        footnotes?: any[];
    };
}

const BASE_URL = 'https://bible.helloao.org/api';
const DEFAULT_TRANSLATION = 'BSB'; // Berean Standard Bible (Free)
const FALLBACK_TRANSLATION = 'WEB'; // World English Bible as a public fallback

async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json() as Promise<T>;
}

export const BibleApiService = {
    async getTranslations(): Promise<Translation[]> {
        try {
            const data = await fetchJson<{ translations: Translation[] }>(`${BASE_URL}/available_translations.json`);
            return data.translations;
        } catch (error) {
            console.error('Error fetching translations:', error);
            return [];
        }
    },

    async getBooks(translationId: string = DEFAULT_TRANSLATION): Promise<Book[]> {
        try {
            const data = await fetchJson<{ books: Book[] }>(`${BASE_URL}/${translationId}/books.json`);
            if (!data.books.length && translationId !== FALLBACK_TRANSLATION) {
                const fallback = await fetchJson<{ books: Book[] }>(`${BASE_URL}/${FALLBACK_TRANSLATION}/books.json`);
                return fallback.books;
            }
            return data.books;
        } catch (error) {
            console.error('Error fetching books:', error);
            if (translationId !== FALLBACK_TRANSLATION) {
                try {
                    const fallback = await fetchJson<{ books: Book[] }>(`${BASE_URL}/${FALLBACK_TRANSLATION}/books.json`);
                    return fallback.books;
                } catch (fallbackError) {
                    console.error('Fallback translation books failed:', fallbackError);
                    return [];
                }
            }
            return [];
        }
    },

    async getChapter(bookId: string, chapterId: number, translationId: string = DEFAULT_TRANSLATION): Promise<Chapter | null> {
        try {
            const data = await fetchJson<Chapter>(`${BASE_URL}/${translationId}/${bookId}/${chapterId}.json`);
            const hasContent =
                (Array.isArray(data?.chapter?.content) && data.chapter.content.length > 0) ||
                (Array.isArray((data as any)?.chapter?.verses) && (data as any).chapter.verses.length > 0);

            if (!hasContent && translationId !== FALLBACK_TRANSLATION) {
                const fallbackData = await fetchJson<Chapter>(`${BASE_URL}/${FALLBACK_TRANSLATION}/${bookId}/${chapterId}.json`);
                return fallbackData;
            }

            return data;
        } catch (error) {
            console.error('Error fetching chapter:', error);
            if (translationId !== FALLBACK_TRANSLATION) {
                try {
                    const fallbackData = await fetchJson<Chapter>(`${BASE_URL}/${FALLBACK_TRANSLATION}/${bookId}/${chapterId}.json`);
                    const hasFallbackContent =
                        (Array.isArray(fallbackData?.chapter?.content) && fallbackData.chapter.content.length > 0) ||
                        (Array.isArray((fallbackData as any)?.chapter?.verses) && (fallbackData as any).chapter.verses.length > 0);
                    return hasFallbackContent ? fallbackData : null;
                } catch (fallbackError) {
                    console.error('Fallback chapter fetch failed:', fallbackError);
                    return null;
                }
            }
            return null;
        }
    }
};
