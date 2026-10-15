<script>
 
    let {student} = $props();

</script>

<ul>
                {#if student.petName}
                    <li>
                   Student Name: {student.studentName} | Pet Type: {student.petType} | Pet Name: {student.petName}
                    </li>
                {:else}
                    <li> 
                        Student Name: {student.studentName} | No pet yet.
                    </li>
                {/if}
</ul>