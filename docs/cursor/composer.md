-- github_accounts 테이블 생성
create table if not exists github_accounts (
  id uuid default uuid_generate_v4() primary key,
  username text unique not null,
  full_name text not null,
  email text not null,
  token text not null,
  expired date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- updated_at 자동 업데이트를 위한 트리거 함수
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- updated_at 트리거 생성
create trigger set_updated_at
  before update on github_accounts
  for each row
  execute function handle_updated_at();

-- RLS (Row Level Security) 정책 설정
alter table github_accounts enable row level security;

-- 인증된 사용자에게 모든 권한 부여
create policy "Allow full access to authenticated users"
  on github_accounts
  for all
  to authenticated
  using (true)
  with check (true);

  ---

  -- github_accounts 테이블 생성 (이미 있다면 삭제 후 재생성)
drop table if exists github_accounts;

create table github_accounts (
  id uuid default uuid_generate_v4() primary key,
  username text unique not null,
  full_name text not null,
  email text not null,
  token text not null,
  expired date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- updated_at 자동 업데이트를 위한 트리거
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on github_accounts
  for each row
  execute function handle_updated_at();

-- RLS 비활성화 (서비스 계정에서 직접 접근하므로 RLS가 필요없음)
alter table github_accounts disable row level security;


---

-- github_accounts 테이블 생성 (이미 있다면 삭제 후 재생성)
drop table if exists github_accounts;

create table github_accounts (
  id uuid default uuid_generate_v4() primary key,
  username text unique not null,
  full_name text not null,
  email text not null,
  token text not null,
  expired date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- updated_at 자동 업데이트를 위한 트리거
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on github_accounts
  for each row
  execute function handle_updated_at();

-- RLS 비활성화 (서비스 계정에서 직접 접근하므로 RLS가 필요없음)
alter table github_accounts disable row level security;