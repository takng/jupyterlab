// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { validateModel as validateKernelModel } from '../kernel/validate';

import { Session } from './session';

import { validateProperty } from '../validate';

/**
 * Validate an `Session.IModel` object.
 */
export function validateModel(data: any): Session.IModel {
  let model = {
    id: data.id,
    kernel: data.kernel,
    name: data.name,
    path: data.path,
    type: data.type
  };
  // Support legacy session model.
  if (data.path === undefined && data.notebook !== undefined) {
    model.path = data.notebook.path;
    model.type = 'notebook';
    model.name = '';
  }
  validateProperty(model, 'id', 'string');
  validateProperty(model, 'type', 'string');
  validateProperty(model, 'name', 'string');
  validateProperty(model, 'path', 'string');
  validateProperty(model, 'kernel', 'object');
  validateKernelModel(model.kernel);
  return model;
}
