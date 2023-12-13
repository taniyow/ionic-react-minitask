import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonAvatar, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import { fetchUsers } from "../services/UserService";

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };

    getUsers();
  }, []);

  const removeUser = (email: string) => {
    setUsers(users.filter(user => user.email !== email));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic React Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {users.map((user, index) => (
            <IonItemSliding key={index}>
              <IonItem>
                <IonAvatar slot="start">
                  <img src={user.picture.thumbnail} alt="User"/>
                </IonAvatar>
                <IonLabel>
                  {user.name.first} {user.name.last}
                </IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => removeUser(user.email)}>
                  Delete
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
