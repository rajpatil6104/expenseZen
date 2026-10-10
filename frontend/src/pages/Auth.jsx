/*import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '../App';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet } from 'lucide-react';

export default function Auth({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', loginData);
      onLogin(response.data.token, response.data.user);
      toast.success('Welcome back!');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/register', registerData);
      onLogin(response.data.token, response.data.user);
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] via-[#E8F3E8] to-[#FAFAF9] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-3 rounded-xl">
              <Wallet className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold text-foreground" style={{ fontFamily: 'Manrope, sans-serif' }}>
              ExpenseZen
            </h1>
          </div>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            Take control of your finances with simple, beautiful expense tracking
          </p>
          <div className="space-y-4 pt-6">
            <div className="flex items-start gap-3">
              <div className="bg-accent/10 p-2 rounded-lg mt-1">
                <div className="h-2 w-2 bg-accent rounded-full" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Track Every Expense</h3>
                <p className="text-muted-foreground">Categorize and organize your spending effortlessly</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-accent/10 p-2 rounded-lg mt-1">
                <div className="h-2 w-2 bg-accent rounded-full" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Visual Analytics</h3>
                <p className="text-muted-foreground">See your spending patterns with beautiful charts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-accent/10 p-2 rounded-lg mt-1">
                <div className="h-2 w-2 bg-accent rounded-full" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Set Budgets</h3>
                <p className="text-muted-foreground">Stay on track with monthly budget limits</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-border animate-fade-in">
          <CardHeader>
            <CardTitle className="text-3xl" style={{ fontFamily: 'Manrope, sans-serif' }}>Get Started</CardTitle>
            <CardDescription>Create an account or sign in to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" data-testid="login-tab">Login</TabsTrigger>
                <TabsTrigger value="register" data-testid="register-tab">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      data-testid="login-email-input"
                      type="email"
                      placeholder="you@example.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      data-testid="login-password-input"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    data-testid="login-submit-button"
                    className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Name</Label>
                    <Input
                      id="register-name"
                      data-testid="register-name-input"
                      type="text"
                      placeholder="Your name"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      data-testid="register-email-input"
                      type="email"
                      placeholder="you@example.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      data-testid="register-password-input"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    data-testid="register-submit-button"
                    className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                    disabled={loading}
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
*/


import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { api } from '../App';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, Loader2 } from 'lucide-react';

export default function Auth({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [serverWakingUp, setServerWakingUp] = useState(false); // Track cold start
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

  // 1. Silent wake-up call when the Auth page first loads
  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        // Assuming you added a /health endpoint on your backend
        await api.get('/health'); 
      } catch (error) {
        // Ignore errors here; this is just a background wake-up ping
      }
    };
    wakeUpServer();
  }, []);

  // Helper function to handle requests with a slow-server warning toast
  const handleRequestWithTimeout = async (requestFn) => {
    setLoading(true);
    
    // If the server is sleeping, requests take longer. Show a heads-up after 3 seconds.
    const timer = setTimeout(() => {
      setServerWakingUp(true);
      toast('Waking up server from sleep mode, please wait...', {
        duration: 10000,
        icon: <Loader2 className="h-4 w-4 animate-spin text-primary" />
      });
    }, 3000);

    try {
      const response = await requestFn();
      clearTimeout(timer);
      setServerWakingUp(false);
      return response;
    } catch (error) {
      clearTimeout(timer);
      setServerWakingUp(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await handleRequestWithTimeout(() => api.post('/auth/login', loginData));
      onLogin(response.data.token, response.data.user);
      toast.success('Welcome back!');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await handleRequestWithTimeout(() => api.post('/auth/register', registerData));
      onLogin(response.data.token, response.data.user);
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] via-[#E8F3E8] to-[#FAFAF9] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-3 rounded-xl">
              <Wallet className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold text-foreground" style={{ fontFamily: 'Manrope, sans-serif' }}>
              ExpenseZen
            </h1>
          </div>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            Take control of your finances with simple, beautiful expense tracking
          </p>
          <div className="space-y-4 pt-6">
            <div className="flex items-start gap-3">
              <div className="bg-accent/10 p-2 rounded-lg mt-1">
                <div className="h-2 w-2 bg-accent rounded-full" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Track Every Expense</h3>
                <p className="text-muted-foreground">Categorize and organize your spending effortlessly</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-accent/10 p-2 rounded-lg mt-1">
                <div className="h-2 w-2 bg-accent rounded-full" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Visual Analytics</h3>
                <p className="text-muted-foreground">See your spending patterns with beautiful charts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-accent/10 p-2 rounded-lg mt-1">
                <div className="h-2 w-2 bg-accent rounded-full" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Set Budgets</h3>
                <p className="text-muted-foreground">Stay on track with monthly budget limits</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-border animate-fade-in">
          <CardHeader>
            <CardTitle className="text-3xl" style={{ fontFamily: 'Manrope, sans-serif' }}>Get Started</CardTitle>
            <CardDescription>Create an account or sign in to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" data-testid="login-tab">Login</TabsTrigger>
                <TabsTrigger value="register" data-testid="register-tab">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      data-testid="login-email-input"
                      type="email"
                      placeholder="you@example.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      data-testid="login-password-input"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    data-testid="login-submit-button"
                    className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                    disabled={loading}
                  >
                    {loading ? (serverWakingUp ? 'Waking server up...' : 'Signing in...') : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Name</Label>
                    <Input
                      id="register-name"
                      data-testid="register-name-input"
                      type="text"
                      placeholder="Your name"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      data-testid="register-email-input"
                      type="email"
                      placeholder="you@example.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      data-testid="register-password-input"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    data-testid="register-submit-button"
                    className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                    disabled={loading}
                  >
                    {loading ? (serverWakingUp ? 'Waking server up...' : 'Creating account...') : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
