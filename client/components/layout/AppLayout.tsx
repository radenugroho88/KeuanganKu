import { Outlet, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function AppLayout() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserEmail(session?.user?.email ?? null);
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    if (!isSupabaseConfigured) {
      toast.info("Hubungkan Supabase untuk Google Sign-In", {
        description:
          "Klik Open MCP popover lalu Connect to Supabase dan set VITE_SUPABASE_URL/ANON_KEY.",
      });
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) toast.error("Gagal masuk", { description: error.message });
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      setUserEmail(null);
      return;
    }
    const { error } = await supabase.auth.signOut();
    if (error) toast.error("Gagal keluar", { description: error.message });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 dark:from-zinc-950 dark:via-teal-950/20 dark:to-zinc-900">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-zinc-900/50 border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500" />
            <span className="text-lg font-bold tracking-tight">KeuanganKu</span>
          </Link>

          <div className="flex items-center gap-2">
            {userEmail ? (
              <>
                <span className="hidden sm:block text-sm text-muted-foreground mr-2">
                  {userEmail}
                </span>
                <Button variant="outline" onClick={signOut}>Sign out</Button>
              </>
            ) : (
              <Button onClick={signIn}>Sign in dengan Google</Button>
            )}
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Outlet />
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} KeuanganKu
      </footer>
    </div>
  );
}
