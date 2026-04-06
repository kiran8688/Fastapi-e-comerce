import py_compile
import os

def check_all_py_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".py"):
                path = os.path.join(root, file)
                try:
                    py_compile.compile(path, doraise=True)
                    print(f"OK: {path}")
                except py_compile.PyCompileError as e:
                    print(f"ERROR: {path}\n{e}")

if __name__ == "__main__":
    check_all_py_files("app")
