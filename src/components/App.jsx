import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactsFilter } from 'components/ContactsFilter/ContactsFilter';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactsSection } from './Section/Section';

const LS_KEY = 'cb_key';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedCB = JSON.parse(localStorage.getItem(LS_KEY));
    if (savedCB) {
      this.setState({ contacts: savedCB });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    }
  }

  addContact = data => {
    const { contacts } = this.state;

    const newContact = {
      id: nanoid(),
      ...data,
    };

    contacts.some(contact => contact.name === data.name)
      ? alert(`${data.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  changeFilter = ({ currentTarget: { value } }) => {
    this.setState({ filter: value });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    const FilterlowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(FilterlowerCase)
    );
  };

  deleteContacts = ContactsId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== ContactsId),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filteredContacts();
    return (
      <>
        <ContactsSection title="Phonebook">
          <ContactForm addContact={this.addContact} />
        </ContactsSection>
        <ContactsSection title="Contacts">
          <ContactsFilter changeFilter={this.changeFilter} value={filter} />
          <ContactList
            filteredContacts={filteredContacts}
            deleteContacts={this.deleteContacts}
          />
        </ContactsSection>
      </>
    );
  }
}
