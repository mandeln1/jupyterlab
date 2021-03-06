// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { showErrorMessage } from '@jupyterlab/apputils';

import { ServerConnection, ServiceManager } from '@jupyterlab/services';

import { IConnectionLost } from './tokens';

/**
 * A default connection lost handler, which brings up an error dialog.
 */
export const ConnectionLost: IConnectionLost = async function(
  manager: ServiceManager.IManager,
  err: ServerConnection.NetworkError
): Promise<void> {
  if (Private.showingError) {
    return;
  }
  Private.showingError = true;

  const title = 'Server Connection Error';
  const networkMsg =
    'A connection to the Jupyter server could not be established.\n' +
    'JupyterLab will continue trying to reconnect.\n' +
    'Check your network connection or Jupyter server configuration.\n';

  return showErrorMessage(title, { message: networkMsg }).then(() => {
    Private.showingError = false;
  });
};

/**
 * A namespace for module private functionality.
 */
namespace Private {
  /**
   * Whether the connection lost error is currently being shown.
   */
  export let showingError = false;
}
