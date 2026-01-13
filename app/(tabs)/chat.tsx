import React, { useState } from 'react';
import { Send } from 'lucide-react-native';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Spacing } from '../../constants/Theme';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const SUGGESTED_TOPICS = [
  "What does the Bible say about anxiety?",
  "Who was King David?",
  "Explain the story of Noah's Ark",
  "What is the meaning of John 3:16?",
];

export default function ChatTab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(messageText),
        isUser: false,
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (question: string): string => {
    if (question.toLowerCase().includes('anxiety')) {
      return "The Bible offers great comfort for anxiety! Philippians 4:6-7 says, 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.'";
    }
    if (question.toLowerCase().includes('david')) {
      return "King David was the second king of Israel and is one of the most important figures in the Bible! He started as a shepherd boy, defeated the giant Goliath, and became a great king. He's known for writing many of the Psalms and being 'a man after God's own heart.'";
    }
    if (question.toLowerCase().includes('noah')) {
      return "Noah's Ark is found in Genesis 6-9. God saw that the world had become corrupt and violent, so He decided to send a flood. But Noah was righteous, so God told him to build an ark and bring his family and two of every animal. After 40 days of rain, the flood covered the earth, and eventually the waters receded. God made a rainbow as a promise never to flood the earth again.";
    }
    return "That's a great question! The Bible is full of wisdom and stories that can help us in our daily lives. Would you like me to share a specific verse or story related to your question?";
  };

  const startNewChat = () => {
    setMessages([]);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      {messages.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Chat with BibleStudy</Text>
          <Text style={styles.emptySubtitle}>Ask any question about the Bible</Text>
          
          <View style={styles.topicsContainer}>
            {SUGGESTED_TOPICS.map((topic, index) => (
              <Pressable 
                key={index} 
                style={styles.topicCard}
                onPress={() => handleSend(topic)}
              >
                <Text style={styles.topicText}>{topic}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          renderItem={({ item }) => (
            <View style={[
              styles.messageBubble,
              item.isUser ? styles.userBubble : styles.aiBubble
            ]}>
              {!item.isUser && <Text style={styles.aiLabel}>BibleStudy</Text>}
              <Text style={[
                styles.messageText,
                item.isUser && styles.userMessageText
              ]}>{item.text}</Text>
            </View>
          )}
          ListFooterComponent={
            isTyping ? (
              <View style={styles.typingIndicator}>
                <Text style={styles.typingText}>BibleStudy is typing...</Text>
              </View>
            ) : null
          }
        />
      )}

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        {messages.length > 0 && (
          <Pressable style={styles.newChatButton} onPress={startNewChat}>
            <Text style={styles.newChatText}>New Chat</Text>
          </Pressable>
        )}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Ask anything..."
            placeholderTextColor="#999"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => handleSend()}
          />
          <Pressable 
            style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
            onPress={() => handleSend()}
            disabled={!input.trim()}
          >
            <Send size={20} color="white" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf8f3',
  },
  emptyState: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  topicsContainer: {
    gap: Spacing.md,
  },
  topicCard: {
    backgroundColor: 'white',
    padding: Spacing.lg,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  topicText: {
    fontSize: 16,
    color: '#333',
  },
  messageList: {
    padding: Spacing.lg,
    paddingTop: 100,
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: Spacing.md,
    borderRadius: 16,
    marginBottom: Spacing.md,
  },
  userBubble: {
    backgroundColor: '#7A3E00',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  aiLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7A3E00',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  userMessageText: {
    color: 'white',
  },
  typingIndicator: {
    padding: Spacing.md,
  },
  typingText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  inputContainer: {
    padding: Spacing.lg,
    paddingBottom: 30,
    backgroundColor: '#fdf8f3',
    gap: Spacing.sm,
  },
  newChatButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  newChatText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingLeft: Spacing.md,
    paddingRight: 6,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7A3E00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
