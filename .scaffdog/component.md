---
name: 'component'
root: 'src/components'
output: '**/*'
ignore: []
questions:
  category:
    message: 'コンポーネントが属するカテゴリーを選択してください。'
    choices: ['utils', 'shop', 'user']
  name: 'コンポーネントの名前を入力してください。'
---

# `{{ inputs.name | pascal }}/index.ts`

```tsx
export { {{ inputs.name | pascal }} } from './{{ inputs.name | pascal }}';
{{ }}
```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.tsx`

```tsx
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const {{ inputs.name | pascal }}: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};
{{ }}
```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.stories.tsx`

```tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { {{ inputs.name | pascal }} } from './{{ inputs.name | pascal }}';

export default {
  title: '{{ inputs.category }}/{{ inputs.name | pascal }}',
  component: {{ inputs.name | pascal }}
} as ComponentMeta<typeof {{ inputs.name | pascal }}>;

const Template: ComponentStory<typeof {{ inputs.name | pascal }}> = (args) => <{{ inputs.name | pascal }} {...args} />;

const dummyData = {
  children: 'Testing text.'
};

export const Default = Template.bind({});
Default.storyName = '正常表示｜PC';
Default.args = dummyData;

export const DefaultSp = Template.bind({});
DefaultSp.storyName = '正常表示｜SP';
DefaultSp.parameters = {
  viewport: {
    defaultViewport: 'iphone6'
  }
};
DefaultSp.args = dummyData;
{{ }}
```
