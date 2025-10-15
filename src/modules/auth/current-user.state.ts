import { atom, useAtom } from "jotai";
import { User } from "@supabase/supabase-js";

const currentUserState = atom<User>();

export const useCurrentUserStore = () => {
	const [currentUser, setCurrentUser] = useAtom(currentUserState);

	return { currentUser, set:setCurrentUser };
};