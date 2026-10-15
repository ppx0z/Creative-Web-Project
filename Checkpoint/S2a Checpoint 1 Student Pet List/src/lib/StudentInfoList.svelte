<script>
    import {
        studentData,
        newStudent,
        addStudent,
    } from "./shared/StudentData.svelte.js";

    import StudentCard from "./StudentCard.svelte";

    function handleSubmit(e) {
        e.preventDefault();
        addStudent();
    }
</script>

<div class="input-data">
    <h1>Register a Student.</h1>
    <form onsubmit={handleSubmit}>
        Student Name: <input bind:value={newStudent.studentName} />
        Pet Type: <input bind:value={newStudent.petType} />
        Pet Name: <input bind:value={newStudent.petName} />
        <button>Add Student</button>
    </form>
</div>

<div class="student-info">
    <h1>Student List</h1>
    <ul>
        {#each studentData.students as student}
           <StudentCard {student}/>
        {/each}
    </ul>
</div>
