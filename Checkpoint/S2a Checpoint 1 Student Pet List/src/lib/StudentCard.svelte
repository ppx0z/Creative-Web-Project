<script>
 
    let {student} = $props();

</script>

<li>
                Student Name: {student.studentName}

                {#if student.petName}
                    Pet Type: {student.petType} - Pet Name: {student.petName}
                {:else}
                    No pet yet.
                {/if}
</li>