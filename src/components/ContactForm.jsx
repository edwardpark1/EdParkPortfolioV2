import {
    createRef,
    useState,
    useEffect,
    useRef,
} from "react";
import {
    useNavigate
} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_KEY = "6LcUQBQoAAAAAHApo4d_uUvtvCP2mHlww0ND2LVH";

const contactFields = [
    {
        name: "contact-name",
        label: "Name",
        type: "text",
        placeholder: "Name",
        isRequired: true,
        maxLength: 50,
    },
    {
        name: "contact-email",
        label: "Email",
        type: "email",
        placeholder: "Email",
        isRequired: true,
        maxLength: 320,
    },
    {
        name: "contact-message",
        label: "Message",
        type: "textarea",
        placeholder: "Message",
        isRequired: true,
        maxLength: 5000,
    }
];

export default function ContactForm() {
    let navigate = useNavigate()
    const contactErrorExist = useRef(false);
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true)
    const recaptchaRef = createRef();

    const [contactValues, setContactValues] = useState(() => {
        const initialContactValues = {};
        contactFields.map((field) => {
            initialContactValues[field.name] = "";
        });

        return initialContactValues;
    });

    const [contactErrors, setContactErrors] = useState(() => {
        const initialContactErrors = {};
        contactFields.map((field) => {
            initialContactErrors[field.name] = [];
        });
        return initialContactErrors;
    });

    const [isContactSubmitted, setIsContactSubmitted] = useState(false);

    const handleContact = e => {
        const { name, value } = e.target;

        setContactValues({
            ...contactValues,
            [name]: value
        })
    }

    const formValidation = (contactValues) => {
        const errors = {};
        contactErrorExist.current = false;

        contactFields.map((field) => {
            errors[field.name] = [];

            if (field.isRequired) {
                if (!contactValues[field.name]) {
                    errors[field.name].push(`${field.label} must not be blank`);
                    contactErrorExist.current = true;
                }
            }
            else if (contactValues[field.name].length > field.maxLength) {
                errors[field.name].push(`${field.label} must be ${field.maxLength} characters or less`);
                contactErrorExist.current = true;
            }
        });

        return errors;
    }

    // From Netlify documentation
    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    useEffect(() => {
        if (!contactErrorExist.current && isContactSubmitted) {
            const recaptchaValue = recaptchaRef.current.getValue()

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode({
                    "form-name": "contact-form",
                    'g-recaptcha-response': recaptchaValue,
                    ...contactValues
                })
            })
                .then(() => navigate('/formconfirmation', {
                    state: { isFormSubmitted: true }
                }))
                .catch(() => {
                    document.getElementById('submit-status').textContent = "Form failed to submit. Please try again.";
                    contactErrorExist.current = false;
                    setIsContactSubmitted(false);
                    setContactValues(() => {
                        const initialContactValues = {};
                        contactFields.map((field) => {
                            initialContactValues[field.name] = "";
                        });

                        return initialContactValues;
                    })
                })
        }
    }, [contactErrors, contactValues, isContactSubmitted, navigate, recaptchaRef])

    return (
        <>
            <p className="text-center">Fields marked with asterisk (*) cannot be left blank.</p>
            <form
                data-netlify="true"
                data-netlify-recaptcha="true"
                className="max-w-read w-[100%] flex flex-col flex-nowrap items-center"
                action="/formconfirmation"
                onSubmit={(e) => {
                    e.preventDefault();
                    setContactErrors(formValidation(contactValues));
                    setIsContactSubmitted(true);
                }}
            >
                {contactFields.map((contactField, id) => (
                    <div key={id} className="mt-6 w-[100%] flex flex-col flex-nowrap items-center gap-3">
                        <label
                            className="max-w-[30em] w-[100%]">
                            {`${(contactField.isRequired ? "*" : "")}${contactField.label}`}
                            {(contactField.type === "textarea") ?
                                (
                                    <textarea
                                        name={contactField.name}
                                        id={contactField.name}
                                        placeholder={contactField.placeholder}
                                        required={contactField.isRequired}
                                        className="mt-3 px-5 py-4 bg-transparent border-2 border-solid border-neutGray-500 rounded-[5px] max-w-[30em] w-[100%] backdrop-blur-[5px]"
                                        value={contactValues[contactField.name]}
                                        onChange={handleContact}>
                                    </textarea>
                                )
                                :
                                (
                                    <input
                                        type={contactField.type}
                                        name={contactField.name}
                                        id={contactField.name}
                                        placeholder={contactField.placeholder}
                                        required={contactField.isRequired}
                                        className="mt-3 px-5 py-4 bg-transparent border-2 border-solid border-neutGray-500 rounded-[5px] max-w-[30em] w-[100%] backdrop-blur-[5px]"
                                        value={contactValues[contactField.name]}
                                        onChange={handleContact}
                                    />
                                )
                            }
                        </label>
                        {
                            contactErrors[contactField.name].map((nameError, id) => (
                                <p key={id} className="text-suppRed-300 self-start">{nameError}</p>
                            ))
                        }
                    </div>
                ))}
                <ReCAPTCHA
                    className="my-8"
                    ref={recaptchaRef}
                    sitekey={RECAPTCHA_KEY}
                    size="normal"
                    id="recaptcha-google"
                    onChange={() => setSubmitBtnDisabled(false)}
                />
                <p id="submit-status" className="text-suppRed-300 self-start"></p>
                <button
                    type="submit"
                    className="mt-8 glassy-icon px-6"
                    disabled={submitBtnDisabled}
                >Submit Message</button>
            </form>
        </>
    );
}