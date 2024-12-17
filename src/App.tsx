import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator } from '@/components/Calculator';
import { BestDeals } from '@/components/BestDeals';
import { Search } from '@/components/Search';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import { useFirestore } from '@/lib/hooks/useFirestore';
import { useAuth } from '@/lib/hooks/useAuth';
import { Scale, Calculator as CalculatorIcon, Search as SearchIcon } from 'lucide-react';
import { seedDatabase } from '@/lib/firebase/seedData';
import { Alert, AlertDescription } from '@/components/ui/alert';

function App() {
  const { loading: storeLoading, error, products } = useFirestore();
  const { loading: authLoading, user } = useAuth();

  useEffect(() => {
    const initializeData = async () => {
      if (user && !storeLoading && products && products.length === 0) {
        try {
          await seedDatabase(user.uid);
        } catch (error) {
          console.error('Error seeding database:', error);
        }
      }
    };

    initializeData();
  }, [user, storeLoading, products]);

  if (storeLoading || authLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertDescription>
            {error.message || 'An error occurred while loading the application'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Header />

      {user ? (
        <Tabs defaultValue="deals" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="deals" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              Best Deals
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <CalculatorIcon className="h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <SearchIcon className="h-4 w-4" />
              Search
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="deals">
            <BestDeals />
          </TabsContent>
          
          <TabsContent value="calculator">
            <Calculator />
          </TabsContent>
          
          <TabsContent value="search">
            <Search />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Protein Price Tracker</h2>
          <p className="text-muted-foreground">
            Please sign in to start tracking protein prices and finding the best deals.
          </p>
        </div>
      )}
      
      <Toaster />
    </div>
  );
}

export default App;