import Events from 'ampersand-events';

class WebChannel {
  constructor () {
    // turn this into an event emitter
    Events.createEmitter(this);

    // listen for WebChannel messages
    window.addEventListener('WebChannelMessageToContent', this._messageReceived.bind(this));
  }

  sendMessage (type, data) {
    window.dispatchEvent(new window.CustomEvent('WebChannelMessageToChrome', {
      detail: {
        id: 'ohai',
        message: {
          type: type,
          data: data
        }
      }
    }));
  }

  sendAutocompleteClick (result, resultType) {
    this.sendMessage('autocomplete-url-clicked', {
      result: result,
      resultType: resultType
    });
  }

  sendUrlSelected (result, resultType) {
    this.sendMessage('url-selected', {
      result: result,
      resultType: resultType
    });
  }

  _messageReceived (e) {
    const message = e.detail.message;

    if (message && message.data) {
      this.trigger(message.type, message.data);
    }
  }
}

export default new WebChannel();
