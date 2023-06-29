async function process_argv() {
  let { argv } = process;
  argv = argv.slice(2);
  const result = await studentActivitiesRegistration(argv);

  return result;
}

async function getStudentActivities() {
  try {
      const res = await fetch('http://localhost:3001/activities');
      const data = await res.json();
      return data.map(value => ({
          id: value.id,
          name: value.name,
          desc: value.desc,
          days: value.days
      }));
  } catch (error) {
      return error;
  }
}

async function studentActivitiesRegistration(data) {
  const endpoint = 'http://localhost:3001/students';
  
  switch (data[0]) {
    case 'CREATE':
      try {
        const activities = await getStudentActivities();
        const activitiesByDay = activities.filter(activity => activity.days.includes(data[2]));
        const studentData = { name: data[1], activities: activitiesByDay.map(activity => ({ name: activity.name, desc: activity.desc })) };
        const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(studentData) });
        const student = await response.json();
        return { id: student.id, name: student.name, activities: student.activities.map(activity => ({ name: activity.name, desc: activity.desc })) };
      } catch (error) {
        return error;
      }
    case 'DELETE':
      try {
        await fetch(`${endpoint}/${data[1]}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
        return { message: `Successfully deleted student data with id ${data[1]}` };
      } catch (error) {
        return error;
      }
    default:
      return { message: 'Invalid operation type' };
  }
}

async function addStudent(name, day) {
  try {
      const activities = await getStudentActivities();
      
      const filteredActivities = activities.filter(activity => {
          return activity.days.includes(day);
      });

      const newStudent = {
          name: name,
          activities: filteredActivities.map(activity => {
              return { 
                  name: activity.name, 
                  desc: activity.desc 
              };
          })
      };

      const requestOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newStudent),
      };

      const response = await fetch('http://localhost:3001/students', requestOptions);
      const responseData = await response.json();

      const formattedResponse = {
          id: responseData.id,
          name: responseData.name,
          activities: responseData.activities.map(activity => {
              return { 
                  name: activity.name, 
                  desc: activity.desc 
              };
          })
      };

      return formattedResponse;
  } catch (error) {
      return error;
  }
}

async function deleteStudent(id) {
  try {
      const requestOptions = {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      };

      await fetch(`http://localhost:3001/students/${id}`, requestOptions);

      const response = { 
          message: `Successfully deleted student data with id ${id}` 
      };

      return response;
  } catch (error) {
      return error;
  }
}


process_argv()
  .then((data) => {
      console.log(data);
  })
  .catch((err) => {
      console.log(err);
  });

module.exports = {
  studentActivitiesRegistration,
  getStudentActivities,
  addStudent,
  deleteStudent
};