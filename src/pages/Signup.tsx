import { useState } from "react";
import { authRepository } from "@/modules/auth/auth.repository";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await authRepository.signup(name, email, password);
      setIsEmailSent(true);
    } catch (err) {
      setError("登録に失敗しました。入力内容をご確認ください。");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // メール送信完了画面
  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Notionクローン</h2>
          <div className="mt-8 w-full max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="text-center space-y-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">認証メールを送信しました</h3>
                <p className="text-sm text-gray-600">
                  ご登録いただいたメールアドレス宛に認証メールを送信しました。
                  <br />
                  メールに記載されたリンクをクリックして、アカウントの認証を完了してください。
                </p>
                <div className="mt-6">
                  <a href="/signin" className="text-sm font-medium text-slate-600 hover:text-slate-500">
                    ログイン画面に戻る →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 登録フォーム画面
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Notionクローン</h2>
        <div className="mt-8 w-full max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                  ユーザー名
                </label>
                <div className="mt-1">
                  <input id="username" name="username" placeholder="ユーザー名" required type="text" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  メールアドレス
                </label>
                <div className="mt-1">
                  <input id="email" name="email" placeholder="メールアドレス" required type="email" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                  パスワード
                </label>
                <div className="mt-1">
                  <input id="password" name="password" placeholder="パスワード" required type="password" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <div>
                <button disabled={name === "" || email === "" || password === "" || isLoading} onClick={signup} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? "登録中..." : "登録"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
