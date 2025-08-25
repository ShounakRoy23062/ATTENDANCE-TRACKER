import os

def take_attendance(day):
    attendance = {}
    for roll_no in range(1, 73):
        status = input(f"Is student with roll number {roll_no} present? (y/n): ").strip().lower()
        attendance[roll_no] = status == 'y'
    
    with open(f"{day}.txt", "w") as file:
        for roll_no, present in attendance.items():
            file.write(f"{roll_no}: {'Present' if present else 'Absent'}\n")
    print(f"Attendance for {day} saved successfully.")

def check_attendance(day, roll_no):
    if not os.path.exists(f"{day}.txt"):
        print(f"No attendance record found for {day}.")
        return
    
    with open(f"{day}.txt", "r") as file:
        for line in file:
            stored_roll_no, status = line.strip().split(": ")
            if int(stored_roll_no) == roll_no:
                print(f"Student with roll number {roll_no} was {'Present' if status == 'Present' else 'Absent'} on {day}.")
                return
        print(f"No record found for roll number {roll_no} on {day}.")

def modify_attendance(day, roll_no):
    if not os.path.exists(f"{day}.txt"):
        print(f"No attendance record found for {day}.")
        return

    attendance = {}
    with open(f"{day}.txt", "r") as file:
        for line in file:
            stored_roll_no, status = line.strip().split(": ")
            attendance[int(stored_roll_no)] = status == 'Present'
    
    status = input(f"Is student with roll number {roll_no} present? (y/n): ").strip().lower()
    attendance[roll_no] = status == 'y'

    with open(f"{day}.txt", "w") as file:
        for roll_no, present in attendance.items():
            file.write(f"{roll_no}: {'Present' if present else 'Absent'}\n")
    print(f"Attendance for {day} updated successfully.")

def menu():
    while True:
        print("\nMenu:")
        print("1) Take attendance")
        print("2) Check if a student was present on a certain day")
        print("3) Modify the attendance of a particular day")
        print("4) Exit")
        
        choice = input("Enter your choice: ").strip()

        if choice == '1':
            day = input("Enter the day (e.g., 13-09-2024): ").strip()
            take_attendance(day)
        elif choice == '2':
            day = input("Enter the day (e.g., 13-09-2024): ").strip()
            roll_no = int(input("Enter the roll number: ").strip())
            check_attendance(day, roll_no)
        elif choice == '3':
            day = input("Enter the day (e.g., 13-09-2024): ").strip()
            roll_no = int(input("Enter the roll number: ").strip())
            modify_attendance(day, roll_no)
        elif choice == '4':
            print("Exiting the program.")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    menu()
