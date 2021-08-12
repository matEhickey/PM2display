// add i and shortMessage to log object
const formatLog = (log, i) => {
  const newLog = {
    ...log,
    i,
  };

  const shortMessage = log.message.slice(0, 150);
  if (shortMessage === log.message) {
    newLog.shortMessage = log.message;
  } else {
    newLog.shortMessage = `${shortMessage} ...`;
  }

  return newLog;
};

const logTable = (logs) => `
<link
	href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
	rel="stylesheet">
<div class="flex items-center justify-center min-h-screen bg-gray-900 px-10">
	<div class="col-span-12">
		<div class="overflow-auto lg:overflow-visible ">
			<table class="table text-gray-400 border-separate space-y-6 text-sm">
				<thead class="bg-gray-800 text-gray-500">
					<tr>
						<th class="p-3">App</th>
						<th class="p-3 text-left">Message</th>
						<th class="p-3 text-left">Time</th>
						<th class="p-3 text-left">Actions</th>
					</tr>
				</thead>
				<tbody>

          ${logs
            .map(
              (l, i) => `
            <tr 
              id="log-${i}" 
              class="bg-gray-800 hover:bg-gray-700" 
              onclick="toggleDescription(${i})"
            >
  						<td class="p-3">
  							<div class="flex align-items-center">
  								<div class="ml-3">
  									<div class="">${l.app_name}</div>
  									<div class="text-gray-500">${l.process_id}</div>
  								</div>
  							</div>
  						</td>
  						<td class="p-3">
  							${l.shortMessage}
  						</td>
  						<td class="p-3 font-bold">
  							${l.timestamp}
  						</td>

  						<td class="p-3">
  							<a
                  href="#"
                  onclick="removeLog(${i}, event);"
                  class="text-gray-400 hover:text-gray-100 ml-2"
                >
  								<i class="material-icons-round text-base">delete_outline</i>
  							</a>
  						</td>
              
              <tr id="log-description-${i}" style="display: none;">
                <td class="p-3"></td>
                <td colspan=3 class="p-3">
                  ${l.message}
                </td>
              </tr>
  					</tr>
          `
            )
            .join("")}
				</tbody>
			</table>
		</div>
	</div>
</div>

<script>
  const removeLog = (i, event) => {
    event.stopPropagation();
    
    document.getElementById(\`log-\${i}\`).remove();
    document.getElementById(\`log-description-\${i}\`).remove();
  };
  
  const toggleDescription = (i) => {
    const description = document.getElementById(\`log-description-\${i}\`);
    if(description.style.display === 'none') {
      description.style.display = '';
    } else {
      description.style.display = 'none';
    }
  };
</script>

<style>
  .table {
    border-spacing: 0 15px;
  }

  i {
    font-size: 1rem !important;
  }

  .table tr {
    border-radius: 20px;
  }

  tr td:nth-child(n+5),
  tr th:nth-child(n+5) {
    border-radius: 0 .625rem .625rem 0;
  }

  tr td:nth-child(1),
  tr th:nth-child(1) {
    border-radius: .625rem 0 0 .625rem;
  }
</style>
`;

module.exports = { logTable, formatLog };
