import { supabase } from "@/lib/supabase";

export const authRepository = {
  // 登録
  async signup(name: string, email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error != null || data.user == null) throw new Error(error?.message);

    return {
      ...data.user,
      user_metadata: data.user.user_metadata,
    };
  },

  // ログイン
  async signin(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error != null || data.user == null) throw new Error(error?.message);

    return {
      ...data.user,
      user_metadata: data.user.user_metadata,
    };
  },

	// ログアウト
	async signout() {
		const { error } = await supabase.auth.signOut();
		if (error != null) throw new Error(error?.message);
	},

  // 現在のユーザーを取得
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getSession();
    if (error != null) throw new Error(error?.message);
    if (data.session == null) return;

    return {
      ...data.session.user,
      userName: data.session.user.user_metadata.name,
    };
  },
};
