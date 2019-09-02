const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = (notification => {
    return admin.firestore().collection('notifications')
        .add(notification)
        .then(doc => console.log('Notification added => ', doc))
})

// Trigger => new training added to the database
exports.trainingCreated = functions.region('europe-west1').firestore
    .document('trainings/{trainingId}') // whenever a project is created in trainings collection
    .onCreate(doc => { // fire callback function
        const training = doc.data(); // title, createdBy, firstname etc
        const notification = {
            content: 'Added a new training',
            user: `${training.authorFirstName} ${training.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification);
});


exports.trainingDelete = functions.region('europe-west1').firestore
    .document('trainings/{trainingId}')
    .onDelete(doc => {
        const training = doc.data();
        const notification = {
            content: 'Training deleted',
            user: `${training.authorFirstName} ${training.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp() 
        }

        return createNotification(notification);
    })

// Trigger => new user was registered in the database
exports.userJoined = functions.region('europe-west1').auth.user()
    .onCreate(user => {
        return admin.firestore().collection('users')
            .doc(user.uid).get().then(doc => {
                const newUser = doc.data();
                const notification = {
                    content: 'New Member joined',
                    user: `${newUser.firstname} ${newUser.lastname}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }

                return createNotification(notification);

            })
})
