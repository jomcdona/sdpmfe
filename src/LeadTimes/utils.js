const addLeadTime = (leadtime) =>
{
   const url = "http://localhost:8080/addleadtime?leadtime=" + leadtime;
   console.log("calling addLeadTime with  " + url)
   fetch(url, {
       method: 'GET',
       headers: {
           'Content-Type': "text/plain"
       }

   });
}

export { addLeadTime }