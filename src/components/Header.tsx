import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/lib/hooks/useAuth';

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold">Protein Price Tracker</h1>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsAuthModalOpen(true)}>Sign In</Button>
          )}
        </div>
      </div>
      <p className="text-muted-foreground text-center">
        Find the best protein deals and compare prices
      </p>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}