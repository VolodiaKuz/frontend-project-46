const makeIndent = (depth, closedBrackets = false, repeater = ' ', spaceCount = 4) => {
  if (closedBrackets) return repeater.repeat(spaceCount * (depth - 1));
  return repeater.repeat(spaceCount * depth);
};

const printValue = (keyValue, depth) => {
  if (typeof keyValue === 'object' && keyValue !== null) {
    const currentIndent = makeIndent(depth);
    const currentClosedBrackerIndent = makeIndent(depth, true);

    const lines = Object.entries(keyValue).map(([keyName, value]) => {
      const resultString = `${currentIndent}${keyName}: ${printValue(value, depth + 1)}`;
      return resultString;
    });
    return `{\n${lines.join('\n')}\n${currentClosedBrackerIndent}}`;
  }

  return `${keyValue}`;
};

const getStylishFormat = (diff) => {
  const iter = (node, depth = 1, repeater = ' ', spaceCount = 4) => {
    const currentIndent = repeater.repeat(spaceCount * depth);
    const closedBracketIndent = repeater.repeat(spaceCount * (depth - 1));
    const lines = node.map((singleNode) => {
      if (singleNode.state === 'added') {
        return `${currentIndent.slice(2)}+ ${singleNode.keyName}: ${printValue(singleNode.keyValue, depth + 1)}`;
      }
      if (singleNode.state === 'similar') {
        return `${currentIndent.slice(2)}  ${singleNode.keyName}: ${printValue(singleNode.keyValue, depth + 1)}`;
      }
      if (singleNode.state === 'removed') {
        return `${currentIndent.slice(2)}- ${singleNode.keyName}: ${printValue(singleNode.keyValue, depth + 1)}`;
      }
      if (singleNode.state === 'updated') {
        const str1 = `${currentIndent.slice(2)}- ${singleNode.keyName}: ${printValue(singleNode.oldValue, depth + 1)}\n`;
        const str2 = `${currentIndent.slice(2)}+ ${singleNode.keyName}: ${printValue(singleNode.newValue, depth + 1)}`;
        return str1 + str2;
      }
      if (singleNode.state === 'nested') {
        return `${currentIndent}${singleNode.keyName}: ${iter(singleNode.keyValue, depth + 1)}`;
      }
      return null;
    });

    return `{\n${lines.join('\n')}\n${closedBracketIndent}}`;
  };

  return iter(diff, 1);
};

export default getStylishFormat;
