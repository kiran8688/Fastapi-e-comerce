from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher

# Modern Argon2 hashing
pwd_context = PasswordHash((
    Argon2Hasher(),
))

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)