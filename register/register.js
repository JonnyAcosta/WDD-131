document.addEventListener("DOMContentLoaded", function () {
    let participantCount = 1; // One participant is already present
  
    document.getElementById("add").addEventListener("click", function () {
      participantCount++;
  
      // Generate a new participant section using the template
      let newParticipantHTML = participantTemplate(participantCount);
  
      // Insert the new participant before the "Add Participant" button
      document.getElementById("add").insertAdjacentHTML("beforebegin", newParticipantHTML);
    });
  
    // Listen for form submission
    document.querySelector("form").addEventListener("submit", submitForm);
  });
  
  // Function to handle form submission
  function submitForm(event) {
    event.preventDefault(); // Prevent page reload
  
    // Get total fees
    let totalFeeAmount = totalFees();
  
    // Get the adult's name
    let adultName = document.getElementById("adult_name").value || "Participant";
  
    // Hide the form
    document.querySelector("form").classList.add("hide");
  
    // Show the summary message
    let info = { name: adultName, participants: participantCount, feeTotal: totalFeeAmount };
    document.getElementById("summary").innerHTML = successTemplate(info);
    document.getElementById("summary").classList.remove("hide");
  }
  
  // Function to calculate total fees
  function totalFees() {
    let feeElements = document.querySelectorAll("[id^=fee]");
  
    // Convert NodeList to an array
    let feeArray = [...feeElements];
  
    // Sum up all the fees using reduce
    let total = feeArray.reduce((sum, input) => sum + (Number(input.value) || 0), 0);
  
    return total;
  }
  
  // Function to generate the success message
  function successTemplate(info) {
    return `
      <p>Thank you, <strong>${info.name}</strong>, for registering.</p>
      <p>You have registered <strong>${info.participants}</strong> participant(s) and owe <strong>$${info.feeTotal}</strong> in Fees.</p>
    `;
  }
  
  // Function to generate a new participant section
  function participantTemplate(count) {
    return `
      <section class="participant${count}">
        <p>Participant ${count}</p>
        <div class="item">
          <label for="fname${count}"> First Name<span>*</span></label>
          <input id="fname${count}" type="text" name="fname${count}" required />
        </div>
        <div class="item activities">
          <label for="activity${count}">Activity #<span>*</span></label>
          <input id="activity${count}" type="text" name="activity${count}" />
        </div>
        <div class="item">
          <label for="fee${count}">Fee ($)<span>*</span></label>
          <input id="fee${count}" type="number" name="fee${count}" />
        </div>
        <div class="item">
          <label for="date${count}">Desired Date <span>*</span></label>
          <input id="date${count}" type="date" name="date${count}" />
        </div>
        <div class="item">
          <p>Grade</p>
          <select name="grade${count}">
            <option selected value="" disabled selected></option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
            <option value="6">6th</option>
            <option value="7">7th</option>
            <option value="8">8th</option>
            <option value="9">9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>
        </div>
      </section>
    `;
  }
  