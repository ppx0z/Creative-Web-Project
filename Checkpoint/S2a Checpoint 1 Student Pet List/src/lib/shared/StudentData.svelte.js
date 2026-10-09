export const studentData = $state({students: [
    { studentName: 'LJ', petType: 'Cat', petName: 'Siopao' },
    { studentName: 'Izzy', petType: 'Cat', petName: 'Willow' },
    { studentName: 'Ashley', petType: 'Dog', petName: 'Pearl' },
    { studentName: 'Arbie', petType: 'Dog', petName: 'Sohpie' },
    { studentName: 'Jon', petType: '', petName: '' }
]
})

export const newStudent = $state({
    studentName: '',
    petType: '',
    petName: ''
});

export function addStudent() {
    studentData.students.push({ ...newStudent });
    newStudent.studentName = newStudent.petType = newStudent.petName = '';
}