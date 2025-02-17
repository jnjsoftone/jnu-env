const getEnv = (src: '.env' | 'json' | 'yaml' | 'supabase' | 'google' | 'airtable' | 'sqlite') => {
  const env = process.env;
  return {
    env,
  };
};
