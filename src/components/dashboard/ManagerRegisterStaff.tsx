import { useState } from 'react';
import { UserPlus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

export function ManagerRegisterStaff() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast({
      title: 'Staff Registered!',
      description: `${name} has been added to the team.`,
    });
    
    setName('');
    setEmail('');
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      <Card 
        className="card-shadow animate-slide-up active:scale-[0.98] transition-transform cursor-pointer" 
        style={{ animationDelay: '200ms' }}
        onClick={() => setIsOpen(true)}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-success" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Register Staff</h3>
              <p className="text-xs text-muted-foreground">Add new team members</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-success" />
              Register New Staff
            </DrawerTitle>
            <DrawerDescription>Add a new team member to the system</DrawerDescription>
          </DrawerHeader>

          <form onSubmit={handleSubmit} className="px-4 pb-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="staff-name">Full Name</Label>
              <Input
                id="staff-name"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="staff-email">Email</Label>
              <Input
                id="staff-email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Registering...
                </span>
              ) : (
                'Register Staff'
              )}
            </Button>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}
