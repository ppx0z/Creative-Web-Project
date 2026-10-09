<script>
    import {studentData,newStudent,addStudent,} from "./shared/StudentData.svelte.js";

    function handleSubmit(e) {
        e.preventDefault();
        addStudent();
    }
</script>

<div class="input-data">
<h1> Add New Student</h1>
    <form onsubmit={handleSubmit}>
        Student Name: <input bind:value={newStudent.studentName} />
        Pet Type: <input bind:value={newStudent.petType} />
        Pet Name: <input bind:value={newStudent.petName} />
        <button>Add Student</button>
    </form>
</div>

<div class="student-info">
 <h1> Student List</h1>
    <ul>
        {#each studentData.students as student}
            <li>
                Student Name: {student.studentName}
                
                {#if student.petName}
                Pet Type: {student.petType} - Pet Name: {student.petName}
                {:else}
                No pet yet.
                {/if}
                
            </li>
        {/each}
    </ul>
</div>
