import { atom } from "recoil";

type AuthModalState = {
	isOpen: boolean;
	type: "login" | "signup" | "forgotPassword";
};

const initalAuthModalState: AuthModalState = {
	isOpen: false,
	type: "login",
};

export const authModalState = atom<AuthModalState>({
	key: "authModalState",
	default: initalAuthModalState,
});