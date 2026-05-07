import * as fs from 'fs';
import * as path from 'path';

export async function saveOrder(orderNumber: string) {
  const log = {
    orderNumber,
    date: new Date().toISOString()
  };

  const filePath = path.join('src/main/logs', 'order.json');
  fs.writeFileSync(filePath, JSON.stringify(log, null, 2));
}