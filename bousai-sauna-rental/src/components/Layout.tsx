import { Flame } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between px-4">
          <Link to="/" className="flex min-h-11 items-center gap-2 font-black text-primary">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-accent">
              <Flame className="h-5 w-5" />
            </span>
            <span className="text-[15px] tracking-wide">防災サウナレンタル</span>
            <span className="text-xs font-medium text-muted-foreground">（仮）</span>
          </Link>
          <Link
            to="/contact"
            className="flex min-h-11 items-center px-2 text-sm font-bold text-primary underline-offset-4 hover:underline"
          >
            問い合わせ
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-primary pb-28 pt-10 text-primary-foreground md:pb-10">
        <div className="mx-auto w-full max-w-2xl space-y-4 px-4 text-sm">
          <p className="font-bold">防災サウナレンタル（仮）</p>
          <nav className="flex flex-wrap gap-x-6">
            <Link to="/" className="flex min-h-11 items-center opacity-90 hover:opacity-100">
              トップ
            </Link>
            <Link to="/download" className="flex min-h-11 items-center opacity-90 hover:opacity-100">
              資料ダウンロード
            </Link>
            <Link to="/contact" className="flex min-h-11 items-center opacity-90 hover:opacity-100">
              問い合わせ
            </Link>
          </nav>
          <p className="text-xs opacity-70">
            ※本サイトはプロトタイプです。掲載内容・料金は検討中のものを含みます。
          </p>
        </div>
      </footer>
    </div>
  );
}
