const nodemailer = require("nodemailer");

// Nodemailer Transporter

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send Application Status Email

const sendStatusUpdateEmail = async ({
  candidateEmail,
  candidateName,
  jobTitle,
  status,
}) => {
  try {
    if (!candidateEmail) {
      console.log("No candidate email available.");
      return;
    }

    const mailOptions = {
      from: `"AIATS Recruitment" <${process.env.EMAIL_USER}>`,

      to: candidateEmail,

      subject: `Application Update - ${jobTitle}`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: auto;
          padding: 30px;
          background-color: #f8fafc;
          border-radius: 12px;
        ">

          <h2 style="
            color: #06b6d4;
            margin-bottom: 20px;
          ">
            AIATS - Application Update
          </h2>

          <p>
            Dear <strong>${candidateName || "Candidate"}</strong>,
          </p>

          <p>
            We are writing to inform you that your application
            status has been updated.
          </p>

          <div style="
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border: 1px solid #e5e7eb;
          ">

            <p>
              <strong>Position:</strong>
              ${jobTitle || "Job Position"}
            </p>

            <p>
              <strong>Application Status:</strong>
              <span style="
                color: #06b6d4;
                font-weight: bold;
              ">
                ${status}
              </span>
            </p>

          </div>

          ${
            status === "Shortlisted"
              ? `
                <p>
                  Congratulations! Your application has been
                  shortlisted. Our recruitment team will contact
                  you with the next steps.
                </p>
              `
              : ""
          }

          ${
            status === "Interview"
              ? `
                <p>
                  Congratulations! You have been selected for
                  the interview stage. Our recruitment team will
                  contact you with the interview details.
                </p>
              `
              : ""
          }

          ${
            status === "Offered"
              ? `
                <p>
                  Congratulations! We are pleased to inform you
                  that you have received an offer for this position.
                </p>
              `
              : ""
          }

          ${
            status === "Rejected"
              ? `
                <p>
                  Thank you for your interest and for taking the
                  time to apply. We appreciate your effort and
                  wish you success in your future opportunities.
                </p>
              `
              : ""
          }

          <p style="margin-top: 30px;">
            Regards,<br />
            <strong>AIATS Recruitment Team</strong>
          </p>

        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(
      "Status email sent successfully:",
      info.messageId
    );

    return info;
  } catch (error) {
    console.error(
      "Status email error:",
      error.message
    );

    // Email failure should NOT break application status update
    return null;
  }
};

// Send Interview Invitation Email

const sendInterviewInvitationEmail = async ({
  candidateEmail,
  candidateName,
  jobTitle,
  interviewDate,
  interviewTime,
  interviewLink,
}) => {
  try {
    if (!candidateEmail) {
      console.log("No candidate email available.");
      return;
    }

    const mailOptions = {
      from: `"AIATS Recruitment" <${process.env.EMAIL_USER}>`,

      to: candidateEmail,

      subject: `Interview Invitation - ${jobTitle}`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: auto;
          padding: 30px;
          background-color: #f8fafc;
          border-radius: 12px;
        ">

          <h2 style="
            color: #06b6d4;
          ">
            Interview Invitation
          </h2>

          <p>
            Dear <strong>${candidateName || "Candidate"}</strong>,
          </p>

          <p>
            Congratulations! You have been selected for an
            interview for the following position:
          </p>

          <div style="
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
          ">

            <p>
              <strong>Position:</strong>
              ${jobTitle || "Job Position"}
            </p>

            <p>
              <strong>Date:</strong>
              ${interviewDate || "To be announced"}
            </p>

            <p>
              <strong>Time:</strong>
              ${interviewTime || "To be announced"}
            </p>

            ${
              interviewLink
                ? `
                  <p>
                    <strong>Interview Link:</strong>
                  </p>

                  <a
                    href="${interviewLink}"
                    style="
                      display: inline-block;
                      padding: 12px 20px;
                      background-color: #06b6d4;
                      color: white;
                      text-decoration: none;
                      border-radius: 8px;
                    "
                  >
                    Join Interview
                  </a>
                `
                : ""
            }

          </div>

          <p style="margin-top: 25px;">
            Please make sure you are available at the scheduled
            time.
          </p>

          <p>
            Regards,<br />
            <strong>AIATS Recruitment Team</strong>
          </p>

        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(
      "Interview invitation sent successfully:",
      info.messageId
    );

    return info;
  } catch (error) {
    console.error(
      "Interview email error:",
      error.message
    );

    return null;
  }
};

// Export

module.exports = {
  sendStatusUpdateEmail,
  sendInterviewInvitationEmail,
};