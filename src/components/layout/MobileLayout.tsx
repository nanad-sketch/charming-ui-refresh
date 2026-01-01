import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { MobileNavigation } from './MobileNavigation';
import { MobileHeader } from './MobileHeader';

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  hideHeader?: boolean;
  showBack?: boolean;
  onBack?: () => void;
}

export function MobileLayout({ children, title, hideHeader, showBack, onBack }: MobileLayoutProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!hideHeader && <MobileHeader title={title} showBack={showBack} onBack={onBack} />}
      <main className="flex-1 overflow-auto pb-20">
        {children}
      </main>
      <MobileNavigation />
    </div>
  );
}
