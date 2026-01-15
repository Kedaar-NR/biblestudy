import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { SplashScreen } from './components/SplashScreen';
import { IntroScreen } from './components/IntroScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { FeedbackScreen } from './components/FeedbackScreen';
import { FeaturePreviewScreen } from './components/FeaturePreviewScreen';
import { Card } from './components/Card';
import { MainLayout } from './components/MainLayout';
import { HomeScreen } from './components/HomeScreen';
import { StoriesTab } from './components/StoriesTab';
import { DiscoverTab } from './components/DiscoverTab';
import { ChatTab } from './components/ChatTab';

type OnboardingStep = 
  | 'splash' 
  | 'intro' 
  | 'q1' 
  | 'f1' 
  | 'q2' 
  | 'f2' 
  | 'previews' 
  | 'main';

type Tab = 'home' | 'stories' | 'discover' | 'chat';

const App: React.FC = () => {
  const [step, setStep] = React.useState<OnboardingStep>('splash');
  const [activeTab, setActiveTab] = React.useState<Tab>('home');

  const previews = [
    {
      title: "Listen to bible stories & character breakdowns",
      content: (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            width: '240px', 
            height: '480px', 
            background: '#fdf8f3', 
            borderRadius: '32px', 
            border: '8px solid #1a1a1a',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ height: '180px', background: '#e0e0e0' }}>
              <img src="/ancient-city-bg.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Preview" />
            </div>
            <div style={{ padding: '16px', flex: 1 }}>
              <h4 style={{ color: '#333', marginBottom: '8px' }}>Angel announces Jesus' birth to Mary</h4>
              <p style={{ fontSize: '0.8rem', color: '#666' }}>Luke 1:26-38</p>
              <div style={{ background: '#7A3E00', color: 'white', padding: '8px', borderRadius: '8px', marginTop: '16px', textAlign: 'center', fontSize: '0.9rem' }}>
                Play Session
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Told in a modern and relatable way",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
          <Card>
            <p style={{ fontStyle: 'italic', marginBottom: 'var(--spacing-md)' }}>"I feel like I'm listening to a weekend debrief from a friend!"</p>
            <p style={{ textAlign: 'right', fontWeight: '600' }}>- Amelia Carns</p>
          </Card>
          <Card>
            <p style={{ fontStyle: 'italic', marginBottom: 'var(--spacing-md)' }}>"This is the best low pressure way to get into the Bible!"</p>
            <p style={{ textAlign: 'right', fontWeight: '600' }}>- Tarren Gozzi</p>
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="app-root">
      <AnimatePresence mode="wait">
        {step === 'splash' && <SplashScreen onNext={() => setStep('intro')} />}
        
        {step === 'intro' && (
          <IntroScreen 
            onBack={() => setStep('splash')} 
            onNext={() => setStep('q1')} 
          />
        )}
        
        {step === 'q1' && (
          <QuestionScreen
            questionNumber={1}
            totalQuestions={2}
            question="How much of the Bible have you read?"
            options={["None of it", "I know some stories", "Most of it", "Every page!"]}
            onBack={() => setStep('intro')}
            onNext={() => setStep('f1')}
          />
        )}
        
        {step === 'f1' && (
          <FeedbackScreen
            text="Amazing, this is the perfect place to start learning about the Bible!"
            onBack={() => setStep('q1')}
            onNext={() => setStep('q2')}
          />
        )}
        
        {step === 'q2' && (
          <QuestionScreen
            questionNumber={2}
            totalQuestions={2}
            question="What brings you to Bible BFF?"
            options={["Learn more about the Bible", "Get inspired again", "Get biblical advice", "Break down scripture", "Understand the Bible in a new lens", "Grow my faith"]}
            onBack={() => setStep('f1')}
            onNext={() => setStep('f2')}
          />
        )}
        
        {step === 'f2' && (
          <FeedbackScreen
            text="We're excited to help you with these! Let's take a quick peek at what's inside of Bible BFF."
            onBack={() => setStep('q2')}
            onNext={() => setStep('previews')}
          />
        )}
        
        {step === 'previews' && (
          <FeaturePreviewScreen
            previews={previews}
            onBack={() => setStep('f2')}
            onFinish={() => setStep('main')}
          />
        )}
        
        {step === 'main' && (
          <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
            {activeTab === 'home' && <HomeScreen />}
            {activeTab === 'stories' && <StoriesTab />}
            {activeTab === 'discover' && <DiscoverTab />}
            {activeTab === 'chat' && <ChatTab />}
          </MainLayout>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
