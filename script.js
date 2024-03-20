setInterval(function() {
  curDay = dayjs();
  $('#currentDay').text(curDay.format('MMMM D, YYYY h:mm:ss A'));

  updateTimeBlocks()
}, 1000);


function updateTimeBlocks() {
  const currentHour = dayjs().hour();
  $('.time-block').each(function() {
    const hour = parseInt($(this).data('hour'));
    $(this).removeClass('past present future');
    if (hour < currentHour) {
      $(this).addClass('past');
    } else if (hour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });
}
    
$('.saveBtn').click(function() {
  $('.time-block').each(function() {
    const hour = $(this).find('.hour').text();
    const taskTime = $(this).find('.description').val();
  
    if (taskTime) {
      const data = {
        hour: hour,
        task: taskTime
      };
      localStorage.setItem('data-' + hour, JSON.stringify(data));
    }
    
  });
});

const savedData = [];
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key.startsWith('data-')) {
    const data = JSON.parse(localStorage.getItem(key));
    savedData.push(data);
  }
}

const newData = savedData.filter(item => item.task.trim() !== '');
sortData = newData.sort((a, b) => a - b);

newData.forEach((data) => {
  const hour = data.hour;
  const taskTime = data.task;
  const $li = $('<li class="row">');
  const $task = $('<div class="task">').text(hour + '  -  ' + taskTime);
  const $removeBtn = $('<button type="button" class="btn-close btn-close-white" aria-label="Close">');

  $li.append($task);
  $li.append($removeBtn);
  $('#savedTasks').append($li);

  $removeBtn.on('click', function() {
    $li.remove();
  
    $('.time-block[data-hour="' + hour + '"]').find('.description').val('');
  });

  $('.time-block[data-hour="' + hour + '"]').find('.description').val(taskTime);
});


$(document).ready(function() {

  $('.time-block').each(function() {
    const hour = $(this).find("div").text()
    console.log(hour);
    const savedData = localStorage.getItem( "data-" + hour);
    if (savedData) {
     const task = JSON.parse(savedData).task;
  
      $(this).find('.description').val(task);
    }
  });
});
