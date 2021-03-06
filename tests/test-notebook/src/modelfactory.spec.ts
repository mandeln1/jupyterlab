// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { expect } from 'chai';

import { CodeCellModel } from '@jupyterlab/cells';

import { NotebookModel } from '@jupyterlab/notebook';

import { NotebookModelFactory } from '@jupyterlab/notebook';

describe('@jupyterlab/notebook', () => {
  describe('NotebookModelFactory', () => {
    describe('#constructor', () => {
      it('should create a new notebook model factory', () => {
        const factory = new NotebookModelFactory({});
        expect(factory).to.be.an.instanceof(NotebookModelFactory);
      });

      it('should accept a code cell content factory', () => {
        const codeCellContentFactory = new CodeCellModel.ContentFactory();
        const factory = new NotebookModelFactory({ codeCellContentFactory });
        expect(factory.contentFactory.codeCellContentFactory).to.equal(
          codeCellContentFactory
        );
      });

      it('should accept a notebook model content factory', () => {
        const contentFactory = new NotebookModel.ContentFactory({});
        const factory = new NotebookModelFactory({ contentFactory });
        expect(factory.contentFactory).to.equal(contentFactory);
      });
    });

    describe('#contentFactory', () => {
      it('should be the content factory used by the model factory', () => {
        const factory = new NotebookModelFactory({});
        expect(factory.contentFactory).to.be.an.instanceof(
          NotebookModel.ContentFactory
        );
      });
    });

    describe('#name', () => {
      it('should get the name of the model factory', () => {
        const factory = new NotebookModelFactory({});
        expect(factory.name).to.equal('notebook');
      });
    });

    describe('#contentType', () => {
      it('should get the file type', () => {
        const factory = new NotebookModelFactory({});
        expect(factory.contentType).to.equal('notebook');
      });
    });

    describe('#fileFormat', () => {
      it('should get the file format', () => {
        const factory = new NotebookModelFactory({});
        expect(factory.fileFormat).to.equal('json');
      });
    });

    describe('#isDisposed', () => {
      it('should get whether the factory is disposed', () => {
        const factory = new NotebookModelFactory({});
        expect(factory.isDisposed).to.equal(false);
        factory.dispose();
        expect(factory.isDisposed).to.equal(true);
      });
    });

    describe('#dispose()', () => {
      it('should dispose of the model factory', () => {
        const factory = new NotebookModelFactory({});
        factory.dispose();
        expect(factory.isDisposed).to.equal(true);
      });

      it('should be safe to call multiple times', () => {
        const factory = new NotebookModelFactory({});
        factory.dispose();
        factory.dispose();
        expect(factory.isDisposed).to.equal(true);
      });
    });

    describe('#createNew()', () => {
      it('should create a new model for a given path', () => {
        const factory = new NotebookModelFactory({});
        const model = factory.createNew();
        expect(model).to.be.an.instanceof(NotebookModel);
      });

      it('should accept a language preference', () => {
        const factory = new NotebookModelFactory({});
        const model = factory.createNew('foo');
        expect(model.defaultKernelLanguage).to.equal('foo');
      });
    });

    describe('#preferredLanguage()', () => {
      it('should always return an empty string', () => {
        const factory = new NotebookModelFactory({});
        expect(factory.preferredLanguage('')).to.equal('');
        expect(factory.preferredLanguage('.ipynb')).to.equal('');
      });
    });
  });
});
