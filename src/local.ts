import dotenv from 'dotenv';

const getLocalSystemEnv = () => {
  const env = process.env;
  return {
    env,
  };
};

const getLocalDotEnv = (path: string) => {
  const result = dotenv.config({ path });
  return {
    env: result.parsed || {},
  };
};

const getLocalEnv = (type: 'system' | 'dotenv' = 'system', path: string = './.env') => {
  console.log(`type: ${type}, path: ${path}`);
  const systemEnv = getLocalSystemEnv();
  if (type === 'dotenv') {
    const dotEnv = getLocalDotEnv(path);
    return {
      ...systemEnv,
      ...dotEnv,
    };
  }
  return systemEnv;
};


export { getLocalEnv };
