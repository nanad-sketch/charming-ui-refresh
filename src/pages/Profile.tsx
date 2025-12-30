import { User, LogOut, Moon, Bell, Shield, HelpCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Bell, label: 'Notifications', hasToggle: true },
  { icon: Moon, label: 'Dark Mode', hasToggle: true },
  { icon: Shield, label: 'Privacy & Security', hasArrow: true },
  { icon: HelpCircle, label: 'Help & Support', hasArrow: true },
];

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <MobileLayout title="Profile">
      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <Card className="card-shadow animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <Badge
                  variant="outline"
                  className={cn(
                    'mt-2 capitalize',
                    user?.role === 'manager'
                      ? 'border-primary text-primary'
                      : 'border-muted-foreground text-muted-foreground'
                  )}
                >
                  {user?.role}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="card-shadow animate-slide-up" style={{ animationDelay: '100ms' }}>
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  'flex items-center justify-between p-4',
                  index !== menuItems.length - 1 && 'border-b border-border'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                {item.hasToggle && <Switch />}
                {item.hasArrow && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-destructive/10 text-destructive font-medium transition-colors hover:bg-destructive/20 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground pt-4">
          Inventory Management v1.0.0
        </p>
      </div>
    </MobileLayout>
  );
}
