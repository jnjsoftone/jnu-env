import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// 현재 파일의 디렉토리 경로 가져오기
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Functions AREA
let supabaseInstance = null;
// Supabase 클라이언트 초기화
const initSupabase = () => {
    if (supabaseInstance) {
        return supabaseInstance;
    }
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    if (!supabaseUrl || !supabaseKey) {
        throw new Error(`Supabase 환경변수가 설정되지 않았습니다.
      URL: ${supabaseUrl ? '있음' : '없음'}
      KEY: ${supabaseKey ? '있음' : '없음'}`);
    }
    supabaseInstance = createClient(supabaseUrl, supabaseKey);
    return supabaseInstance;
};
const supabase = initSupabase();
// Create - 새로운 GitHub 계정 추가
const createGitHubAccount = async (account) => {
    const { data, error } = await supabase
        .from('github_accounts')
        .insert([
        {
            username: account.username,
            full_name: account.fullName,
            email: account.email,
            token: account.token,
            expired: account.expired
        }
    ])
        .select();
    if (error)
        throw error;
    return data;
};
// Read - 모든 GitHub 계정 조회
const getAllGitHubAccounts = async () => {
    const { data, error } = await supabase
        .from('github_accounts')
        .select('*');
    if (error)
        throw error;
    return data;
};
// Read - 특정 GitHub 계정 조회
const getGitHubAccount = async (username) => {
    const { data, error } = await supabase
        .from('github_accounts')
        .select('*')
        .eq('username', username)
        .single();
    if (error)
        throw error;
    return data;
};
// Update - GitHub 계정 정보 업데이트
const updateGitHubAccount = async (username, updates) => {
    const { data, error } = await supabase
        .from('github_accounts')
        .update({
        full_name: updates.fullName,
        email: updates.email,
        token: updates.token,
        expired: updates.expired
    })
        .eq('username', username)
        .select();
    if (error)
        throw error;
    return data;
};
// Delete - GitHub 계정 삭제
const deleteGitHubAccount = async (username) => {
    const { data, error } = await supabase
        .from('github_accounts')
        .delete()
        .eq('username', username)
        .select();
    if (error)
        throw error;
    return data;
};
// JSON 파일에서 Supabase로 데이터 마이그레이션
const migrateGitHubAccountsFromJson = async (jsonData) => {
    try {
        for (const [username, data] of Object.entries(jsonData)) {
            try {
                // 기존 계정 확인
                const { data: existingAccount } = await supabase
                    .from('github_accounts')
                    .select('username')
                    .eq('username', username)
                    .single();
                if (existingAccount) {
                    console.log(`계정 ${username}는 이미 존재합니다. 업데이트합니다.`);
                    const { error: updateError } = await supabase
                        .from('github_accounts')
                        .update({
                        full_name: data.fullName,
                        email: data.email,
                        token: data.token,
                        expired: data.expired || null
                    })
                        .eq('username', username);
                    if (updateError)
                        throw updateError;
                    console.log(`계정 ${username} 업데이트 완료`);
                }
                else {
                    // 새 계정 추가
                    const { error: insertError } = await supabase
                        .from('github_accounts')
                        .insert([{
                            username,
                            full_name: data.fullName,
                            email: data.email,
                            token: data.token,
                            expired: data.expired || null
                        }]);
                    if (insertError)
                        throw insertError;
                    console.log(`계정 ${username} 추가 완료`);
                }
            }
            catch (error) {
                console.error(`계정 ${username} 처리 중 오류:`, error);
                throw error;
            }
        }
        console.log('모든 계정이 성공적으로 처리되었습니다.');
    }
    catch (error) {
        console.error('마이그레이션 중 오류 발생:', error);
        throw error;
    }
};
// Export AREA
export { createGitHubAccount, getAllGitHubAccounts, getGitHubAccount, updateGitHubAccount, deleteGitHubAccount, migrateGitHubAccountsFromJson };
