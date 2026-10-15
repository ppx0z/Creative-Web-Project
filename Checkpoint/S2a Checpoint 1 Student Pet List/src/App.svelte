<script>
  import StudentInfoList from "./lib/StudentInfoList.svelte";
</script>

<header>
 <h1>Student Pet Roster</h1>
</header>

<div id="app"> 
  <StudentInfoList />
</div> 

<style>
  header {
  background-color: #262523;

  text-align: center;
  padding: 1rem;
}

 h1 {
  color: #ebf5f8;
 }
</style>