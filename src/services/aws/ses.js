import AWS from 'aws-sdk'

const ses = new AWS.SES({
  accessKeyId: process.env.SES_ACCESS_KEY,
  secretAccessKey: process.env.SES_SECRET_KEY,
  region: process.env.SES_REGION
})

export const sendNewUserEmail = (data) => {
  const html = `
    <div>
      <p>
        Registration Date: <strong>${new Date().toUTCString()}</strong>
      </p>
      <p>
        Name: <strong>${data.userName}</strong><br/>
        Company: <strong>${data.userCompany}</strong><br/>
        Role in company: <strong>${data.userRole}</strong><br/>
        Email: <strong>${data.userEmail}</strong><br/>
        Contact: <strong>${data.userPhone || ''}</strong><br/>
      </p>
      <p>
        Solution in mind<br/>
        <strong>${data.isSolutionInMind ? 'Yes' : 'No'}</strong><br/>
        New/Existing Project<br/>
        <strong>${data.isNewOrExisting ? 'New' : 'Existing'}</strong><br/>
        ${data.howFarThrough ? 'how far through? <strong>' + data.howFarThrough + '</strong><br/>' : ''}
        Project Name<br/>
        <strong>${data.projectName}</strong><br/>
        Tech Stack<br/>
        <strong>${data.techStack ? data.techStack : ''}</strong>
        Has deadline?
        <strong>${data.hasDeadline ? 'Yes' : 'No'}</strong><br />
        <strong>${data.hasDeadline ? data.deadline : ''}</strong><br />
        Has budget?
        <strong>${data.hasBudget ? 'Yes' : 'No'}</strong><br/>
        <strong>${data.hasBudget ? data.budget : ''}</strong><br/>
      </p>
    </div>
  `
  const params = {
    Destination: {
      ToAddresses: process.env.SES_EMAIL_TO.split(',')
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: html
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'New Registration'
      }
    },
    Source: 'hello@distributed.co'
  }

  ses.sendEmail(params, (err, data) => {
    if (err) console.log(err, err.stack)
    else console.log(data)
  })
}

export const sendScheduleNotification = (data) => {
  const html = `
    <div>
      <p>
        Consultation request
      </p>
      <p>
        Name: <strong>${data.username}</strong><br/>
        Company: <strong>${data.company}</strong><br/>
        Date and time: <strong>${data.date} ${data.time}</strong><br/>
        Call Type: <strong>${data.callType}</strong>
      </p>
    </div>
  `
  const params = {
    Destination: {
      ToAddresses: process.env.SES_EMAIL_TO.split(',')
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: html
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Consultation request on ${data.date} ${data.time} by ${data.username}${data.company ? ', ' + data.company : ''}`
      }
    },
    Source: 'hello@distributed.co'
  }

  ses.sendEmail(params, (err, data) => {
    if (err) console.log(err, err.stack)
    else console.log(data)
  })
}
