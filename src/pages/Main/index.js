import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Container from '../../components/Container';
import { Form, SubmitButton, List, MessageError, DeleteButton } from './styles';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
    messageError: '',
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    try {
      const { newRepo, repositories } = this.state;

      if (newRepo === '') {
        this.setState({
          messageError: 'Você precisa indicar um repositório',
        });

        throw new Error('Você precisa indicar um repositório');
      }

      const hasRepo = repositories.find(r => r.name === newRepo);

      if (hasRepo) {
        this.setState({
          newRepo: '',
          messageError: 'Repositório já adicionado',
        });

        throw new Error('Repositório já adicionado');
      }

      const response = await api.get(`/repos/${newRepo}`).catch(err => {
        if (err.response.status === 404) {
          this.setState({
            newRepo: '',
            messageError: 'Repositório não existe',
          });

          throw new Error('Repositório não existe');
        }
      });

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        messageError: '',
        error: false,
      });
    } catch (err) {
      this.setState({ error: true, messageError: err.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleDelete = repository => {
    const { repositories } = this.state;

    this.setState({
      repositories: repositories.filter(repo => repo.name !== repository),
    });
  };

  render() {
    const { newRepo, repositories, loading, error, messageError } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicione um repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <MessageError>{messageError}</MessageError>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <div>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Details
                </Link>
                <DeleteButton
                  onClick={() => this.handleDelete(repository.name)}
                >
                  <FaTrashAlt />
                </DeleteButton>
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
