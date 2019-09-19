import request from 'request'
import config from '../../config/auth'

class ManagementAPI {
  static call (options) {
    return new Promise((resolve, reject) => {
      request(options, (err, res, body) => {
        if (err) {
          return reject(err)
        }
        if (res.statusCode !== 204) {
          return resolve(JSON.parse(body))
        }
        return resolve(204)
      })
    })
  }
  static async getAuth0AccessToken () {
    const options = {
      method: 'POST',
      url: `${config.domain}/oauth/token`,
      headers: { 'content-type': 'application/json' },
      body: `{
        "client_id": "${config.clientId}",
        "client_secret": "${config.clientSecret}",
        "audience": "${config.domain}/api/v2/",
        "grant_type": "client_credentials"
      }`
    }

    const res = await ManagementAPI.call(options)
    return res.access_token
  }

  static async getUserRole (userId) {
    const accessToken = await ManagementAPI.getAuth0AccessToken()
    const options = {
      method: 'GET',
      url: `${config.domain}/api/v2/users/${userId}/roles`,
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
    return ManagementAPI.call(options)
  }

  static async getRoleUsers (roleId) {
    const accessToken = await ManagementAPI.getAuth0AccessToken()
    const options = {
      method: 'GET',
      url: `${config.domain}/api/v2/roles/${roleId}/users`,
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
    return ManagementAPI.call(options)
  }

  static async getRoles () {
    const accessToken = await ManagementAPI.getAuth0AccessToken()
    const options = {
      method: 'GET',
      url: `${config.domain}/api/v2/roles`,
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
    return ManagementAPI.call(options)
  }

  static async createUser (user) {
    const accessToken = await ManagementAPI.getAuth0AccessToken()
    const options = {
      method: 'POST',
      url: `${config.domain}/api/v2/users`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        // phone_number: user.phone,
        password: user.password,
        connection: 'Username-Password-Authentication'
      })
    }
    return ManagementAPI.call(options)
  }

  static async updateUser (authId, data) {
    const accessToken = await ManagementAPI.getAuth0AccessToken()
    const options = {
      method: 'PATCH',
      url: `${config.domain}/api/v2/users/auth0|${authId}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    return ManagementAPI.call(options)
  }

  static async deleteUser (authId) {
    const accessToken = await ManagementAPI.getAuth0AccessToken()
    const options = {
      method: 'DELETE',
      url: `${config.domain}/api/v2/users/auth0|${authId}`,
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
    return ManagementAPI.call(options)
  }
}

export default ManagementAPI
