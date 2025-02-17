import { migrateGitHubAccountsFromJson } from '../esm/supabase.js';
import { loadJson } from 'jnu-abc';

async function migrateGithubData() {
  try {
    console.log('환경변수 확인:', {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY?.slice(0, 10) + '...',
    });

    const devRoot = process.env.DEV_ROOT || './config';
    const githubAccounts = loadJson(devRoot + '/jd-environments/Apis/github.json');

    if (!githubAccounts) {
      throw new Error('GitHub 계정 데이터를 로드할 수 없습니다.');
    }

    console.log('로드된 계정 수:', Object.keys(githubAccounts).length);
    console.log('첫 번째 계정 데이터:', {
      username: Object.keys(githubAccounts)[0],
      data: {
        ...Object.values(githubAccounts)[0],
        token: Object.values(githubAccounts)[0].token.slice(0, 10) + '...',
      },
    });

    await migrateGitHubAccountsFromJson(githubAccounts);

    console.log('마이그레이션이 성공적으로 완료되었습니다.');
  } catch (error) {
    console.error('마이그레이션 중 오류가 발생했습니다:', error.message);
    console.error('상세 오류:', error);
  }
}

// 마이그레이션 실행
migrateGithubData();
