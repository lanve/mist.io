import logging


from mist.io.helpers import generate_backend_id


from mist.io.model import User, Backend, Keypair
from mist.io.exceptions import *


log = logging.getLogger(__name__)


def add_backend(user, title, provider, apikey,
                apisecret, apiurl, tenant_name):
    """Adds a new backend to the user and returns the new backend_id."""

    # if api secret not given, search if we already know it
    if apisecret == 'getsecretfromdb':
        for backend_id in user.backends:
            if backend.apikey == user.backends[backend_id].apikey:
                apisecret = user.backends[backend_id].apisecret
                break

    region = ''
    if not isinstance(provider, int) and ':' in provider:
        provider = provider.split(':')[0]
        region = provider.split(':')[1]

    if not provider or not apikey or not apisecret:
        raise BadRequestError("Invalid backend data")

    backend_id = generate_backend_id(provider, region, apikey)

    if backend_id in user.backends:
        raise ConflictError("Backend exists")

    backend = Backend()
    backend.title = title
    backend.provider = provider
    backend.apikey = apikey
    backend.apisecret = apisecret
    backend.apiurl = apiurl
    backend.tenant_name = tenant_name
    backend.region = region
    backend.enabled = True
    #~ FIXME backend.poll_interval
    with user.lock_n_load():
        user.backends[backend_id] = backend
        user.save()
    return backend_id


def delete_backend(user, backend_id):
    if backend_id not in user.backends:
        raise BackendNotFoundError()
    with user.lock_n_load():
        del user.backends[backend_id]
        user.save()
