let domainSearchedFor = document.getElementById("domain-availability-checker")
let domainExtension = document.getElementById("extension-types")
let domainSearchBtn = document.getElementById("domain-search-btn")
let domainAvailabilityMsg = document.getElementById("domain-available-msg")
let listDomain = document.getElementById("domain-search-response")
let domainNameDom = document.getElementById("domain-entered")
let domainAvailabilityStatus = document.getElementById("availability-status")

let domain;
let extension;
let domainAndExtension;
let domainInputValues;

const sendRequestDomainAvailability = () => {
    fetch(
    `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_LqlCa2vizvQlnZihjhquIxg1bHFde&domainName=${domainAndExtension}&credits=DA`
    ).then(response => response.json())
    .then(data => cbDomainResponse(data.DomainInfo))
    .catch(err => console.error(err))

    const cbDomainResponse = (domainResponse) => {

        let availabilityCheck;
        console.log(domainResponse)
        if(domainResponse.domainAvailability === "AVAILABLE") {
            availabilityCheck = "available"

        } else if(domainResponse.domainAvailability === "UNAVAILABLE") {
            availabilityCheck = "unavailable"
        }


        domainNameDom.textContent = domainResponse.domainName
        domainAvailabilityStatus.textContent = availabilityCheck
        domainAvailabilityMsg.classList.remove("hide")
        domainAvailabilityMsg.classList.add("show")
    }
}

const getDomainRequest = () => {
    domain = domainSearchedFor.value
    console.log(domain)
    extension = domainExtension.value
    console.log(extension)

    // user input, check for error
    if(!domain || !isNaN(domain)) {
        console.log("invalid")
        return
    }

    domainInputValues = domain.split(".")
    console.log(domainInputValues)

    if (domainInputValues[1]) {
        if(
            domainInputValues[1] !== "com" &&
            domainInputValues[1] !== "org" &&
            domainInputValues[1] !== "co" &&
            domainInputValues[1] !== "net" &&
            domainInputValues[1] !== "xyz"
        ) {
            console.log("use correct extension")
            return

        } else if(
            domainInputValues[1] === "com" ||
            domainInputValues[1] === "org" ||
            domainInputValues[1] === "co" ||
            domainInputValues[1] === "net" ||
            domainInputValues[1] === "xyz"
            ) {
            domainAndExtension = domain
            console.log("user added extension themself")
        } else if(domainInputValues[1] === null) {
            domainAndExtension = domain + extension
            console.log("open space")
        }

    } else {
        domainAndExtension = domain +"."+ extension
        console.log("extension added by domain memo")
    }

    
    console.log(domainAndExtension)
    sendRequestDomainAvailability()
}
domainSearchBtn.addEventListener("click", getDomainRequest)