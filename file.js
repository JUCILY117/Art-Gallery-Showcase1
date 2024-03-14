function generateReceipt() {
    // Get billing address details
    const fullName = document.querySelector('#billingForm input[name="fullName"]').value;
    const email = document.querySelector('#billingForm input[name="email"]').value;
    const address = document.querySelector('#billingForm input[name="address"]').value;
    const city = document.querySelector('#billingForm input[name="city"]').value;
    const state = document.querySelector('#billingForm select[name="state"]').value;
    const zipCode = document.querySelector('#billingForm input[name="zipCode"]').value;

    // Display receipt
    const receiptContainer = document.getElementById('receiptContainer');
    receiptContainer.innerHTML = `
    <h3>RECEIPT</h3>
        <div class="c1">
        <p><strong>Name :</strong>&nbsp;${fullName}</p>
        </div>
        <div class="c2">
        <p><strong>Email :</strong>&nbsp;${email}</p>
        </div>
        <div class="c1">
        <p><strong>Address :</strong>&nbsp;${address}</p>
        </div>
        <div class="c2">
        <p><strong>City :</strong>&nbsp;${city}</p>
        </div>
        <div class="c1">
        <p><strong>State :</strong>&nbsp;${state}</p>
        </div>
        <div class="c2">
        <p><strong>Zip Code :</strong>&nbsp;${zipCode}</p>
        </div>
        `;


    // Back to Homepage button
    const btnBackContainer = document.getElementById('btnBack');
    btnBackContainer.innerHTML = `
        <div class="btn">
            <button type="button" id="btnBackBtn" class="btn" onclick="backToHomepage()">Back to Homepage</button>
        </div>
    `;

    // Hide the forms and show the receipt container
    document.getElementById('container').style.display = 'none';
    receiptContainer.style.display = 'block';
    btnBackContainer.style.display = 'block';
}
    function backToHomepage() {
        window.location.href = 'home.html';
    }