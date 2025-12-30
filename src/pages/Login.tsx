import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Mail, Lock, Users } from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('staff');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = login(email, password, role);
    
    if (success) {
      toast({
        title: 'Welcome back!',
        description: `Logged in as ${role === 'manager' ? 'Manager' : 'Staff'}`,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top safe-area-bottom">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 animate-fade-in">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg mb-4">
            <Package className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Inventory</h1>
          <p className="text-sm text-muted-foreground">Management System</p>
        </div>

        <Card className="w-full max-w-sm card-shadow animate-slide-up">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Select Role</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('staff')}
                    className={cn(
                      'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200',
                      role === 'staff'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50 text-muted-foreground'
                    )}
                  >
                    <Users className="w-6 h-6" />
                    <span className="font-medium text-sm">Staff</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('manager')}
                    className={cn(
                      'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200',
                      role === 'manager'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50 text-muted-foreground'
                    )}
                  >
                    <Users className="w-6 h-6" />
                    <span className="font-medium text-sm">Manager</span>
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12 rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 h-12 rounded-xl"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl font-semibold text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-xs text-center text-muted-foreground mt-6 animate-fade-in">
          Demo: Enter any email and password to login
        </p>
      </div>
    </div>
  );
}
