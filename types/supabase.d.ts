type GitHubAccount = {
    id?: string;
    username: string;
    fullName: string;
    email: string;
    token: string;
    expired?: string;
};
declare const createGitHubAccount: (account: GitHubAccount) => Promise<any[]>;
declare const getAllGitHubAccounts: () => Promise<any[]>;
declare const getGitHubAccount: (username: string) => Promise<any>;
declare const updateGitHubAccount: (username: string, updates: Partial<GitHubAccount>) => Promise<any[]>;
declare const deleteGitHubAccount: (username: string) => Promise<any[]>;
declare const migrateGitHubAccountsFromJson: (jsonData: Record<string, any>) => Promise<void>;
export { createGitHubAccount, getAllGitHubAccounts, getGitHubAccount, updateGitHubAccount, deleteGitHubAccount, migrateGitHubAccountsFromJson };
//# sourceMappingURL=supabase.d.ts.map